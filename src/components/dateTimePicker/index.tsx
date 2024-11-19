import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR, enUS, esES } from '@mui/x-date-pickers/locales';
import { DateTimePicker } from '@mui/x-date-pickers';

const DateTimePickerComponent: React.FC = ({ ...props }) => {
    return <LocalizationProvider
        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
        dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <DateTimePicker {...props} />
        </DemoContainer>
    </LocalizationProvider>
}

export default DateTimePickerComponent;