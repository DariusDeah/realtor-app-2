export const hideFields = (target: Record<string, unknown>, fields: string[]) => {
    fields.forEach((field) => {
        target[field] = null;
    });
    return target;
};
