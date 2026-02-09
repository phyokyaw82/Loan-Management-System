import InterestRate from "./interestRate.model.js";

const DEFAULT_RATES = [5, 10, 15, 20];

const seedInterestRates = async () => {
    try {
        const existingRates = await InterestRate.find({
            rate: { $in: DEFAULT_RATES },
        });

        const existingValues = existingRates.map(r => r.rate);

        const ratesToInsert = DEFAULT_RATES
            .filter(rate => !existingValues.includes(rate))
            .map(rate => ({ rate }));

        if (ratesToInsert.length > 0) {
            await InterestRate.insertMany(ratesToInsert);
            console.log("✅ Interest rates seeded:", ratesToInsert.map(r => r.rate));
        } else {
            console.log("ℹ️ Interest rates already exist");
        }
    } catch (error) {
        console.error("❌ Interest rate seeding failed:", error);
    }
};

export default seedInterestRates;
