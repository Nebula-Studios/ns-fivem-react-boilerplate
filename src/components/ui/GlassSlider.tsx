import React, { useEffect, useState } from 'react';

interface GlassSliderProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	disabled?: boolean;
	icon?: React.ReactNode;
	showValue?: boolean;
	showMinMax?: boolean;
	unit?: string;
	className?: string;
	formatValue?: (value: number) => string;
	error?: string;
	editableValue?: boolean;
}

const GlassSlider: React.FC<GlassSliderProps> = ({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	label,
	disabled = false,
	icon,
	showValue = true,
	showMinMax = false,
	unit = '',
	className = '',
	formatValue,
	error,
	editableValue = false,
}) => {
	const percentage = ((value - min) / (max - min)) * 100;

	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(String(value));

	useEffect(() => {
		setInputValue(String(value));
	}, [value]);

	const clamp = (v: number) => Math.min(max, Math.max(min, v));

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value);
		onChange(newValue);
	};

	const commitValue = () => {
		const parsed = parseInt(inputValue);
		if (!Number.isFinite(parsed)) {
			setIsEditing(false);
			setInputValue(String(value));
			return;
		}
		const clamped = clamp(parsed);
		if (clamped !== value) onChange(clamped);
		setIsEditing(false);
	};

	const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			commitValue();
		} else if (e.key === 'Escape') {
			setIsEditing(false);
			setInputValue(String(value));
		}
	};

	const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

	return (
		<div className={`relative ${className}`}>
			{label && (
				<label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
					{icon && <span className="w-4 h-4">{icon}</span>}
					{label}
				</label>
			)}

			<div className="space-y-3">
				{/* Slider container with glass effect */}
				<div
					className={`glass relative overflow-hidden transition-all duration-300 ${
						disabled ? 'opacity-50 cursor-not-allowed' : ''
					} ${error ? 'border-red-500/50 shadow-red-500/10' : ''}`}
					style={{
						padding: '16px',
						borderRadius: '12px',
						border: error
							? '1px solid rgba(239, 68, 68, 0.5)'
							: '1px solid rgba(255, 255, 255, 0.08)',
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

					{/* Custom slider track */}
					<div className="relative z-10">
						<div
							className="w-full h-2 bg-neutral-700 rounded-lg relative overflow-hidden"
							style={{
								background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, rgb(64 64 64) ${percentage}%, rgb(64 64 64) 100%)`,
							}}
						>
							{/* Glass effect on the track */}
							<div
								className="absolute inset-0 opacity-30"
								style={{
									background:
										'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
								}}
							/>
						</div>

						{/* Native slider (invisible but functional) */}
						<input
							type="range"
							min={min}
							max={max}
							step={step}
							value={value}
							onChange={handleSliderChange}
							disabled={disabled}
							className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
							style={{
								WebkitAppearance: 'none',
								appearance: 'none',
							}}
						/>

						{/* Custom thumb */}
						<div
							className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"
							style={{
								left: `${percentage}%`,
							}}
						>
							<div
								className={`w-5 h-5 rounded-full border-2 border-white/20 transition-all duration-200 ${
									disabled ? 'bg-neutral-500' : 'bg-primary'
								}`}
								style={{
									boxShadow: disabled
										? '0 2px 8px rgba(115, 115, 115, 0.3)'
										: '0 2px 8px rgba(237, 41, 57, 0.4), 0 0 20px rgba(237, 41, 57, 0.2)',
									background: disabled ? '#737373' : 'var(--color-primary)',
								}}
							/>
						</div>
					</div>
				</div>

				{/* Value display and min/max labels */}
				<div className="flex justify-between items-center text-xs">
					{showMinMax && (
						<span className="text-neutral-400">
							{min}
							{unit}
						</span>
					)}

					{showValue &&
						(editableValue ? (
							isEditing ? (
								<input
									type="number"
									className="mx-auto w-20 text-center bg-transparent border border-neutral-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-primary"
									value={inputValue}
									min={min}
									max={max}
									step={step}
									onChange={(e) => setInputValue(e.target.value)}
									onBlur={commitValue}
									onKeyDown={onKeyDown}
									autoFocus
								/>
							) : (
								<button
									type="button"
									className="text-primary font-medium text-sm mx-auto underline-offset-4 hover:underline"
									onClick={() => setIsEditing(true)}
								>
									{displayValue}
								</button>
							)
						) : (
							<span className="text-primary font-medium text-sm mx-auto">
								{displayValue}
							</span>
						))}

					{showMinMax && (
						<span className="text-neutral-400">
							{max}
							{unit}
						</span>
					)}
				</div>

				{error && (
					<p className="mt-2 text-xs text-red-400 flex items-center gap-1">
						<span className="w-3 h-3">⚠</span>
						{error}
					</p>
				)}
			</div>
		</div>
	);
};

export default GlassSlider;
