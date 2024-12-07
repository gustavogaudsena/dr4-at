import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR, enUS, esES } from '@mui/x-date-pickers/locales';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';


interface DateTimePickerProps {
    value: Dayjs | null;
    label: string;
    name: string;
    onChange: (value: Dayjs | null) => void;
}

const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({ ...props }) => {
    return <LocalizationProvider
        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
        dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <DateTimePicker {...props} />
        </DemoContainer>
    </LocalizationProvider>
}

export default DateTimePickerComponent;