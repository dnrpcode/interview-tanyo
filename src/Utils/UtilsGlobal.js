import * as Yup from "yup";

export const isToday = (someDate, selectDay) => {
    return someDate.getDate() == selectDay.getDate() &&
        someDate.getMonth() == selectDay.getMonth() &&
        someDate.getFullYear() == selectDay.getFullYear()
}

export const filterSchedule = (data, selectDay = new Date()) => {
    return data.filter((d) => isToday(new Date(d.time), selectDay))
}

export const generateTime = (x) => {
    const tms = new Date(x);
    return tms.getHours() + ":" + tms.getMinutes() + ":" + tms.getSeconds();
}

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email tidak valid!').required('Wajib diisi!'),
    password: Yup.string()
        .min(2, 'Minimal 5 digit!')
        .max(20, 'Maksimal 20 digit!')
        .required('Wajib diisi!')
});