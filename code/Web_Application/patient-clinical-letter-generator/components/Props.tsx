export interface DatePickerProps {
    labelName: string;
    type: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
  }