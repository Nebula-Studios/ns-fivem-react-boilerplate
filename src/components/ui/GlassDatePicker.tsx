import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

interface GlassDatePickerProps {
	value: string;
	onChange: (date: string) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	error?: string;
}

const GlassDatePicker: React.FC<GlassDatePickerProps> = ({
	value,
	onChange,
	placeholder = 'Seleziona una data',
	label,
	disabled = false,
	error,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [isEditingYear, setIsEditingYear] = useState(false);
	const [tempYear, setTempYear] = useState('');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const yearInputRef = useRef<HTMLInputElement>(null);

	// Parse the current value or use today's date - fix timezone issue
	const selectedDate = value ? new Date(value + 'T00:00:00') : null;
	const today = new Date();

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setIsEditingYear(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Focus year input when editing starts
	useEffect(() => {
		if (isEditingYear && yearInputRef.current) {
			yearInputRef.current.focus();
			yearInputRef.current.select();
		}
	}, [isEditingYear]);

	// Get days in month
	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		// Add all days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const handleDateSelect = (date: Date) => {
		// Create date string in local timezone to avoid offset issues
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;
		onChange(formattedDate);
		setIsOpen(false);
	};

	const navigateMonth = (direction: 'prev' | 'next') => {
		setCurrentMonth((prev) => {
			const newDate = new Date(prev);
			if (direction === 'prev') {
				newDate.setMonth(prev.getMonth() - 1);
			} else {
				newDate.setMonth(prev.getMonth() + 1);
			}
			return newDate;
		});
	};

	const handleYearEdit = () => {
		setIsEditingYear(true);
		setTempYear(currentMonth.getFullYear().toString());
	};

	const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace(/\D/g, ''); // Only allow digits
		if (value.length <= 4) {
			setTempYear(value);
		}
	};

	const handleYearSubmit = () => {
		const year = parseInt(tempYear);
		if (year >= 1900 && year <= 2100) {
			setCurrentMonth((prev) => {
				const newDate = new Date(prev);
				newDate.setFullYear(year);
				return newDate;
			});
		}
		setIsEditingYear(false);
	};

	const handleYearKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleYearSubmit();
		} else if (event.key === 'Escape') {
			setIsEditingYear(false);
		}
	};

	const formatDisplayDate = (dateString: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('it-IT', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const monthNames = [
		'Gennaio',
		'Febbraio',
		'Marzo',
		'Aprile',
		'Maggio',
		'Giugno',
		'Luglio',
		'Agosto',
		'Settembre',
		'Ottobre',
		'Novembre',
		'Dicembre',
	];

	const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

	const days = getDaysInMonth(currentMonth);

	return (
		<div className="relative select-none" ref={dropdownRef}>
			{label && (
				<label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
					<Calendar className="w-4 h-4" />
					{label}
				</label>
			)}

			{/* Input trigger */}
			<div
				className={`glass relative overflow-hidden cursor-pointer transition-all duration-300 ${
					disabled
						? 'opacity-50 cursor-not-allowed'
						: 'hover:border-primary/30 hover:shadow-primary/5'
				} ${isOpen ? 'border-primary/50 shadow-primary/10' : ''} ${
					error ? 'border-red-500/50 shadow-red-500/10' : ''
				}`}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				style={{
					padding: '12px 16px',
					borderRadius: '8px',
					border: error
						? '1px solid rgba(239, 68, 68, 0.5)'
						: '1px solid rgba(255, 255, 255, 0.08)',
					minHeight: '44px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					boxShadow: error
						? '0 4px 16px rgba(239, 68, 68, 0.1)'
						: isOpen
						? '0 8px 32px rgba(237, 41, 57, 0.1), 0 4px 16px rgba(237, 41, 57, 0.05)'
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

				<span
					className={`relative z-10 ${
						value ? 'text-white' : 'text-[#808080] opacity-40'
					}`}
				>
					{value ? formatDisplayDate(value) : placeholder}
				</span>
				<Calendar
					className={`relative z-10 w-4 h-4 transition-all duration-300 ${
						isOpen ? 'text-primary rotate-6' : 'text-neutral-400'
					}`}
				/>
			</div>

			{/* Calendar dropdown */}
			{isOpen && (
				<div
					className="fixed z-[9999] glass animate-in fade-in duration-200 glass-datepicker-dropdown backdrop-blur-xl"
					style={{
						width: '320px',
						padding: '16px',
						borderRadius: '12px',
						border: '1px solid rgba(255, 255, 255, 0.15)',
						boxShadow:
							'0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
						backdropFilter: 'blur(20px)',
						top: dropdownRef.current
							? `${dropdownRef.current.getBoundingClientRect().bottom + 8}px`
							: '50%',
						left: dropdownRef.current
							? `${dropdownRef.current.getBoundingClientRect().left}px`
							: '50%',
					}}
				>
					{/* Glass reflection for dropdown */}
					<div
						className="absolute inset-0 pointer-events-none opacity-10 rounded-xl"
						style={{
							background:
								'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%, rgba(255, 255, 255, 0.08) 100%)',
						}}
					/>

					<div className="relative z-10">
						{/* Calendar header */}
						<div className="flex items-center justify-between mb-4">
							<button
								type="button"
								onClick={() => navigateMonth('prev')}
								className="btn-icon btn-icon-sm glass hover:bg-neutral-700/30 hover:border-primary/20 transition-all duration-200"
								style={{
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
								}}
							>
								<ChevronLeft className="w-4 h-4" />
							</button>

							<div className="flex items-center gap-2">
								<h3 className="text-white font-semibold text-shadow">
									{monthNames[currentMonth.getMonth()]}{' '}
								</h3>
								{isEditingYear ? (
									<input
										ref={yearInputRef}
										type="text"
										value={tempYear}
										onChange={handleYearChange}
										onBlur={handleYearSubmit}
										onKeyDown={handleYearKeyDown}
										className="bg-transparent border border-primary/50 rounded px-2 py-1 text-white text-sm font-semibold w-16 text-center focus:outline-none focus:border-primary"
										maxLength={4}
									/>
								) : (
									<button
										type="button"
										onClick={handleYearEdit}
										className="text-white font-semibold text-shadow hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
									>
										{currentMonth.getFullYear()}
										<Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
									</button>
								)}
							</div>

							<button
								type="button"
								onClick={() => navigateMonth('next')}
								className="btn-icon btn-icon-sm glass hover:bg-neutral-700/30 hover:border-primary/20 transition-all duration-200"
								style={{
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
								}}
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>

						{/* Day names */}
						<div className="grid grid-cols-7 gap-1 mb-2">
							{dayNames.map((day) => (
								<div
									key={day}
									className="text-center text-xs font-medium text-neutral-400 py-1"
								>
									{day}
								</div>
							))}
						</div>

						{/* Calendar days */}
						<div className="grid grid-cols-7 gap-1">
							{days.map((day, index) => {
								if (!day) {
									return <div key={index} className="h-8" />;
								}

								const isSelected =
									selectedDate &&
									day.getDate() === selectedDate.getDate() &&
									day.getMonth() === selectedDate.getMonth() &&
									day.getFullYear() === selectedDate.getFullYear();

								const isToday =
									day.getDate() === today.getDate() &&
									day.getMonth() === today.getMonth() &&
									day.getFullYear() === today.getFullYear();

								return (
									<button
										key={index}
										type="button"
										onClick={() => handleDateSelect(day)}
										className={`
                      h-8 w-8 rounded text-sm font-medium transition-all duration-200 relative overflow-hidden
                      ${
																							isSelected
																								? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 z-10'
																								: isToday
																								? 'glass text-white ring-1 ring-primary/50 hover:ring-primary/70'
																								: 'text-neutral-300 hover:text-white hover:bg-white/10 hover:scale-105'
																						}
                    `}
										style={
											isSelected
												? {
														boxShadow:
															'0 4px 16px rgba(237, 41, 57, 0.4), 0 2px 8px rgba(237, 41, 57, 0.2)',
												  }
												: {}
										}
									>
										{/* Glass effect for non-selected days */}
										{!isSelected && (
											<div
												className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-200"
												style={{
													background:
														'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
												}}
											/>
										)}
										<span className="relative z-10">{day.getDate()}</span>
									</button>
								);
							})}
						</div>

						{/* Quick actions */}
						<div className="flex gap-2 mt-4 pt-3 border-t border-neutral-700/50">
							<button
								type="button"
								onClick={() => handleDateSelect(today)}
								className="glass text-xs flex-1 py-2 px-3 rounded-md hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
								style={{
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
									color: 'rgba(255, 255, 255, 0.8)',
								}}
							>
								Oggi
							</button>
							<button
								type="button"
								onClick={() => {
									onChange('');
									setIsOpen(false);
								}}
								className="glass text-xs flex-1 py-2 px-3 rounded-md hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200"
								style={{
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
									color: 'rgba(255, 255, 255, 0.8)',
								}}
							>
								Pulisci
							</button>
						</div>
					</div>
				</div>
			)}

			{error && (
				<p className="mt-1 text-xs text-red-400 flex items-center gap-1">
					<span className="w-3 h-3">⚠</span>
					{error}
				</p>
			)}
		</div>
	);
};

export default GlassDatePicker;
