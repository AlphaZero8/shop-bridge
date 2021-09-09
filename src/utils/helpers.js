export const compareIgnoreCase = (str1, str2) => {
    if (!str1 || !str2) {
        throw new Error('Function was called with incorrect and/or insufficient args');
    }

    return str1.toLowerCase() === str2.toLowerCase();
};

export const trimFormData = (data) => {
    if (typeof(data) !== 'object') {
        throw new Error('Function was called with an incorrect arg');
    }

    const trimmedData = {};
    for (const key in data) {
        const value = data[key];
        if (typeof (value) === 'string') {
            trimmedData[key] = value.trim();
        } else {
            trimmedData[key] = value;
        }
    }

    return trimmedData;
};