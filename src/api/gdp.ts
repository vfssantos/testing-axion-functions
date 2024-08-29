
const fetchGdpData = async (countryCode: string): Promise<{ year: number, gdp: number }[]> => {
    const response = await fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&date=2019:2023`
    );
    const data = await response.json();
    const gdpData = data[1].map((entry: any) => ({
        year: entry.date,
        gdp: parseFloat((entry.value / 1e12).toFixed(2)) // Convert to trillion USD
    }));
    return gdpData.reverse(); // Sort data in ascending order of years
};

const calculateGrowth = (data: { year: number, gdp: number }[]) => {
    return data.map((current, index, arr) => {
        if (index === 0) return { year: current.year, growth: null };
        const previous = arr[index - 1];
        const growth = ((current.gdp - previous.gdp) / previous.gdp) * 100;
        return { year: current.year, growth: growth.toFixed(2) };
    });
};

export const GET = async (props: { country?: string }) => {
    const countryCode = props.country?.toUpperCase() || 'CN'; // Default to 'CN' (China) if no country is specified

    try {
        const gdpData = await fetchGdpData(countryCode);
        const growthData = calculateGrowth(gdpData);
        return {
            country: countryCode,
            gdpData,
            growthData,
        };
    } catch (error) {
        throw {
            status: 500,
            body: { error: `Failed to fetch GDP data for country code: ${countryCode}` },
        };
    }
};