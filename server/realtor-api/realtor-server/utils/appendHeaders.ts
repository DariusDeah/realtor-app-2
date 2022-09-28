export const appendHeaders = (newHeaders?: [{ key: string; value: string | string[] }]) => {
    const baseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    };
    const formattedNewHeaders = {};

    if (newHeaders) {
        newHeaders.forEach((header) => {
            Object.defineProperty(formattedNewHeaders, header.key, header.value);
        });
    }

    return {
        ...baseHeaders,
        ...formattedNewHeaders,
    };
};
