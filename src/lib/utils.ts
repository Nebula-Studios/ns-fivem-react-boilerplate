import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility per combinare classi CSS con Tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
