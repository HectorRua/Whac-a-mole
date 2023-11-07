export const createArray = (size: number, element: any) => {
	return Array.from(Array(size)).map(() => element);
};

export const createMatrix = (width: number, height: number, element: any) => {
	const array = createArray(height, undefined);
	return array.map(() => {
		return createArray(width, element);
	});
};

export const copyObject = (object: any) => {
	return JSON.parse(JSON.stringify(object));;
};

//Min and max number inclusives
export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const shuffleArray = (array: Array<any>) =>{
	const copyArray = copyObject(array)
	const newArray = []
	while( copyArray.length > 0 ){
		const index = getRandomInt(0, copyArray.length -1)
		const element = copyArray.splice(index,1)[0]
		newArray.push(element);
	}
	return newArray
}

// Create array range (min and max inclusives)
export const createRange = (min: number, max: number)=>{
	const result = []
	for (let i: number = min; i<= max; i++){
		result.push(i)
	}
	return result
}