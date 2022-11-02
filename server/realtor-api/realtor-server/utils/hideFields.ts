export const hideFields = (target: any, fields: string[]) => {
    fields.forEach((field) => {
        target[field] = null;
    });
    return target;
};
