import { z } from 'zod';

/**
 * @typedef {Object} LoginDto
 * @property {string} email
 * @property {string} password
 */

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(100),
});

/**
 * @readonly
 * @enum {number}
 */
export const Role = {
  Patient: 0,
  Doctor: 1,
  Secretary: 2
};

/**
 * @readonly
 * @enum {number}
 */
export const Gender = {
  Male: 0,
  Female: 1
};

/**
 * @typedef {Object} RegisterDto
 * @property {string} name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} password
 * @property {Role} role
 * @property {number} specializationId
 * @property {string} [clinicLocation]
 * @property {string} [contactInfo]
 * @property {number[]} [symptomIds]
 * @property {number} appointmentPrice
 * @property {string} [dateOfBirth]
 * @property {Gender} gender
 * @property {string} [bloodType]
 * @property {string} [chronicDiseases]
 * @property {number} [assignedDoctorId]
 */

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(100),
  role: z.nativeEnum(Role),
  specializationId: z.number().int(),
  clinicLocation: z.string().optional(),
  contactInfo: z.string().optional(),
  symptomIds: z.array(z.number().int()).optional(),
  appointmentPrice: z.number(),
  dateOfBirth: z.string().optional(),
  gender: z.nativeEnum(Gender),
  bloodType: z.string().optional(),
  chronicDiseases: z.string().optional(),
  assignedDoctorId: z.number().int().optional()
});
