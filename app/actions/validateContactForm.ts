const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NAME_MAX_LENGTH = 100
const EMAIL_MAX_LENGTH = 254
const MESSAGE_MAX_LENGTH = 5000

export function validateContactForm(data: { name: string; email: string; message: string }): string | null {
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return 'Please fill in every field.'
  }
  if (!EMAIL_PATTERN.test(data.email.trim())) {
    return 'Please enter a valid email address.'
  }
  if (data.name.trim().length > NAME_MAX_LENGTH) {
    return 'Please keep your name under 100 characters.'
  }
  if (data.email.trim().length > EMAIL_MAX_LENGTH) {
    return 'Please keep your email under 254 characters.'
  }
  if (data.message.trim().length > MESSAGE_MAX_LENGTH) {
    return 'Please keep your message under 5000 characters.'
  }
  return null
}
