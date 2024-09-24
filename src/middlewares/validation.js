const validate = (schema) => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req.body, { stripUnknown: true });
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        req.body = value;
        next();
    }
}

export default validate;
