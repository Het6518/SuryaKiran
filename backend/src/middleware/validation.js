const { z } = require('zod');

const predictionSchema = z.object({
    inverter_id: z.string({ required_error: 'inverter_id is required' }).min(1, 'inverter_id cannot be empty'),
    block: z.string({ required_error: 'block is required' }).min(1, 'block is required'),
    // Bounds reject typos (e.g. 150000000000 kW) that would wreck fleet totals
    power_kw: z.coerce.number().min(0).max(100000),
    pv1_power_kw: z.coerce.number().min(0).max(100000),
    daily_kwh: z.coerce.number().min(0).max(10000000),
    inverter_temp_c: z.coerce.number().min(-50).max(200),
    ambient_temp_c: z.coerce.number().min(-60).max(80),
    ac_voltage_v: z.coerce.number().min(0).max(100000),
    dc_voltage_v: z.coerce.number().min(0).max(100000),
    ac_current_a: z.coerce.number().min(0).max(100000),
    dc_current_a: z.coerce.number().min(0).max(100000),
    frequency_hz: z.coerce.number().min(0).max(100),
    alarm_code: z.coerce.number().int(),
    op_state: z.coerce.number().int(),
    price_per_kwh_inr: z.coerce.number().min(0).max(1000),
    timestamp: z.string().optional(),
});

const validatePredictionInput = (req, res, next) => {
    try {
        predictionSchema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    validatePredictionInput,
};
