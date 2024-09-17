import { CODE_AZ } from "@/constant/code";

export const GenerateKey = (): string => {
    const array = CODE_AZ.split('');
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array.join('');
}