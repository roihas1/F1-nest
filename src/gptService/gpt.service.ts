import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

const openai = new OpenAI({
    apiKey:'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 '
    });

@Injectable()
export class GptService{

    async getDriverSummary(url:string){
        const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[
                {         
                    role:'user',
                    content:`Please provide a consice summary of the main points from the following topic in the url ${url}. reply in 30 words or less. Dont include information such as birthday, nationality, and his profession.`
                    
                }  
            ],
            max_tokens: 50,
            
            
        });
        let message =response.choices[0].message.content;
        if (message.endsWith('.')===false){
            message = message.split('.').splice(0,message.length-1).join('.') + '.';
        }
        return message;

    }
}