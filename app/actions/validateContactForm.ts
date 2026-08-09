const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: { name: string; email: string; message: string }): string | null {
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return 'Please fill in every field.'
  }
  if (!EMAIL_PATTERN.test(data.email.trim())) {
    return 'Please enter a valid email address.'
  }
  return null
}
