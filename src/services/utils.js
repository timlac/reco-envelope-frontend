export const sumDictValues = obj => {
    Object.values(obj).reduce((a, b) => a + b, 0);
}

export function countAttribute(listOfObjects, attribute) {
        const counts = {}

        for (const obj of listOfObjects) {
            const key = obj[attribute]
            counts[key] = (counts[key] || 0) + 1
        }
        return counts
    }