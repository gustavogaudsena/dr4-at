import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface HandleChangeInterface {
    (data: any, setData: (update: () => any) => void, value: any, field: string): void;
}
interface HandleInputChangeInterface {
    (field: string, value: any, data: any, setData: (update: () => any) => void): void;
}

interface AdjustDateTimeForTimezoneInterface {
    (dateString: string): Dayjs;
}

const adjustDateTimeForTimezone: AdjustDateTimeForTimezoneInterface = (dateString) => {
    if (!dateString) return dayjs(new Date());
    const dateUTC = dayjs.utc(dateString);
    const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');

    return dayjs(dateInUTCMinus.format());
};


const handleChange: HandleChangeInterface = (data, setData, value, field) => {
    const d = data;
    d[field].value = value
    setData(() => ({
        ...d
    }));
}


const getUser = () => {
    const user = localStorage.getItem("session");
    if (user) {
        return JSON.parse(user).user
    }
    return null;
}

const handleInputChange: HandleInputChangeInterface = (field, value, data, setData) => {
    setData({ ...data, [field]: value })
}

export {
    adjustDateTimeForTimezone,
    handleChange,
    handleInputChange,
    getUser
}