import '@testing-library/jest-dom/vitest'
import * as React from 'react'
import { vi } from 'vitest'

// Suppress the test-only React 18 warning about function-valued form action props (see polyfill note below).
const originalConsoleError = console.error
console.error = (...args: Parameters<typeof console.error>) => {
  const [firstArg] = args
  // Suppress only React's "Invalid value for prop `action` on <form> tag" warning.
  // Match the start and a specific substring to avoid suppressing other prop warnings.
  if (typeof firstArg === 'string' && firstArg.startsWith('Warning: Invalid value for prop') && firstArg.includes('tag')) {
    return
  }
  originalConsoleError(...args)
}

// --- Test-only polyfill: useFormState / useFormStatus / <form action={fn}> --
//
// Why this exists: the pinned npm package "react-dom" (^18.3.0, currently
// resolving to 18.3.1) does not export useFormState or useFormStatus, and
// its DOM renderer has no special handling at all for a `<form>`'s `action`
// prop being a function. Verified directly:
//   - `Object.keys(require('react-dom'))` in this project's node_modules
//     contains no useFormState/useFormStatus.
//   - grepping the installed package source for both identifiers and for a
//     `case 'form':` branch in setInitialProperties (react-dom's DOM commit
//     code) turns up nothing that treats a function `action` prop specially.
// Both the two hooks AND the "pass a function as <form action>" behavior
// are React 19 / Next.js-canary-only features. Next.js vendors its own
// canary React build internally (next/dist/compiled/react-dom, confirmed
// present there) and substitutes it for the plain "react-dom" specifier via
// its own webpack/Turbopack bundler at build/dev time — that substitution
// is what makes ContactForm's real
// `import { useFormState, useFormStatus } from 'react-dom'` and
// `<form action={formAction}>` work in the actual running app, despite the
// installed package supporting neither. That substitution does not happen
// when tests run directly through Vite/Vitest.
//
// Attempted alternative: aliasing "react"/"react-dom"/"react-dom/client" in
// vitest.config.ts to Next's compiled canary build so the test harness
// resolves modules the way Next's bundler does. That produced
// "Invalid hook call" / null-dispatcher errors, because
// @testing-library/react still renders through the plain npm
// react-dom/client (loaded via Node's native require, bypassing the Vite
// alias for that externalized dependency) while the aliased react-dom's
// hooks read React's shared dispatcher from a different, non-interoperable
// bundled React instance. Making that route cleanly would require forcing
// much more of node_modules through Vite's transform pipeline — a far
// larger, riskier, whole-suite change for what these two hooks need.
//
// Fix used instead: keep rendering entirely on the real, single react-dom
// instance (react-dom/client, exactly as every other component/test in
// this project already uses) and add a minimal, spec-faithful
// implementation of just the missing pieces on top of it:
//   1. useFormState / useFormStatus, built from plain React hooks in that
//      same React instance (no second React/ReactDOM build, so no
//      dispatcher mismatch).
//   2. A single capturing `submit` listener on `document` that emulates
//      React 19's "form action is a function" behavior: prevents the
//      native submit, builds a FormData from the form, and invokes the
//      action returned by the most recently mounted useFormState() call.
//      This only needs to track one active action at a time because
//      neither ContactForm.test.tsx nor ProjectCTA.test.tsx ever mounts
//      more than one <form> driven by useFormState simultaneously.
//
// None of this touches components/ContactForm.tsx or
// app/actions/contact.ts — both are unmodified and both work as-is in the
// real Next.js app. This only patches what the test harness resolves
// "react-dom" to, and how jsdom's form submission is handled in tests.

type FormAction<S> = (prevState: S, formData: FormData) => S | Promise<S>

// Shared pending flag so a useFormStatus() call in a child component (e.g.
// ContactForm's <SubmitButton />) reflects the pending state of the nearest
// useFormState-driven submit, matching the real hooks' contract of not
// requiring an explicit context provider between them.
let pendingCount = 0
const pendingListeners = new Set<() => void>()

function setPending(isPending: boolean) {
  pendingCount += isPending ? 1 : -1
  pendingListeners.forEach((listener) => listener())
}

function subscribePending(listener: () => void) {
  pendingListeners.add(listener)
  return () => pendingListeners.delete(listener)
}

function getPendingSnapshot() {
  return pendingCount > 0
}

// The most recently mounted useFormState() action, invoked by the global
// submit-event emulation below.
let activeFormAction: ((formData: FormData) => void) | null = null
let submitListenerInstalled = false

function installSubmitListener() {
  if (submitListenerInstalled || typeof document === 'undefined') return
  submitListenerInstalled = true
  document.addEventListener(
    'submit',
    (event) => {
      const form = event.target
      if (form instanceof HTMLFormElement && activeFormAction) {
        event.preventDefault()
        activeFormAction(new FormData(form))
      }
    },
    true
  )
}

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>()
  installSubmitListener()

  function useFormState<S>(action: FormAction<S>, initialState: S) {
    const [state, setState] = React.useState(initialState)
    const stateRef = React.useRef(state)
    stateRef.current = state

    const formAction = React.useCallback(
      (formData: FormData) => {
        setPending(true)
        Promise.resolve(action(stateRef.current, formData))
          .then((result) => setState(() => result))
          .finally(() => setPending(false))
      },
      [action]
    )

    React.useEffect(() => {
      activeFormAction = formAction
      return () => {
        if (activeFormAction === formAction) activeFormAction = null
      }
    }, [formAction])

    return [state, formAction] as const
  }

  function useFormStatus() {
    const pending = React.useSyncExternalStore(subscribePending, getPendingSnapshot, getPendingSnapshot)
    return { pending, data: null, method: null, action: null }
  }

  return { ...actual, useFormState, useFormStatus }
})
