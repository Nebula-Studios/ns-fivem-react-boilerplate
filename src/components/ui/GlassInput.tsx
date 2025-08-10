import React, { forwardRef } from 'react';

interface GlassInputProps {
	type?: 'text' | 'number' | 'password' | 'email';
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	required?: boolean;
	min?: number;
	max?: number;
	step?: number;
	icon?: React.ReactNode;
	error?: string;
	className?: string;
	autoCapitalize?: boolean;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
	(
		{
			type = 'text',
			value,
			onChange,
			placeholder = '',
			label,
			disabled = false,
			required = false,
			min,
			max,
			step,
			icon,
			error,
			className = '',
			autoCapitalize = false,
		},
		ref
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (autoCapitalize && typeof e.target.value === 'string') {
				const v = e.target.value;
				const capped = v.length > 0 ? v.charAt(0).toUpperCase() + v.slice(1) : v;
				if (capped !== v) {
					// aggiorna il valore prima di propagare
					e.target.value = capped;
				}
			}
			onChange(e);
		};
		return (
			<div className={`relative ${className}`}>
				{label && (
					<label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
						{icon && <span className="w-4 h-4">{icon}</span>}
						{label}
						{required && <span className="text-primary">*</span>}
					</label>
				)}

				<div
					className={`glass relative overflow-hidden transition-all duration-300 ${
						disabled
							? 'opacity-50 cursor-not-allowed'
							: 'hover:border-primary/30 hover:shadow-primary/5'
					} ${error ? 'border-red-500/50 shadow-red-500/10' : ''}`}
					style={{
						padding: '12px 16px',
						borderRadius: '8px',
						border: error
							? '1px solid rgba(239, 68, 68, 0.5)'
							: '1px solid rgba(255, 255, 255, 0.08)',
						minHeight: '44px',
						display: 'flex',
						alignItems: 'center',
						boxShadow: error
							? '0 4px 16px rgba(239, 68, 68, 0.1)'
							: '0 4px 16px rgba(0, 0, 0, 0.1)',
					}}
				>
					{/* Glass reflection effect */}
					<div
						className="absolute inset-0 pointer-events-none opacity-20"
						style={{
							background:
								'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
						}}
					/>

					<input
						ref={ref}
						type={type}
						value={value}
						onChange={handleChange}
						placeholder={placeholder}
						disabled={disabled}
						required={required}
						min={min}
						max={max}
						step={step}
						className="relative z-10 w-full bg-transparent outline-none text-white placeholder-neutral-500 text-sm"
						style={{
							fontFamily: 'Inter, sans-serif',
						}}
					/>
				</div>

				{error && (
					<p className="mt-1 text-xs text-red-400 flex items-center gap-1">
						<span className="w-3 h-3">⚠</span>
						{error}
					</p>
				)}
			</div>
		);
	}
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
