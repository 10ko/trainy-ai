import { getOpenAIClient } from '../lib/openrouter'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

export interface CourseStep {
  step: number
  title: string
  content: string
}

export interface CourseContent {
  title: string
  description: string
  content: CourseStep[]
}

export interface CourseGenerationResponse {
  success: boolean
  courseContent?: CourseContent
  error?: string
}

// Zod schema for course content validation
const CourseStepSchema = z.object({
  step: z.number().int().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
})

const CourseContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.array(CourseStepSchema).min(5).max(10),
})

/**
 * Creates the prompt for course generation based on the user's request
 */
export function createCoursePrompt(userRequest: string): string {
  return `Generate course content based on this request: I just joined this establishment as their new employee and I want to learn how to do my job. 
Today I will be learning about the following task: ${userRequest}.
Return the response as a valid JSON. The content of each step should contain the instruction for the person to learn how to fullfill the step.
I want only practical steps and not theoretical ones, give me at least 5 steps and max 10 steps.
If a step requires handling ingredients or amounts, I want precise quantities and measurements. Avoid numbered lists for the content of the steps`
}

/**
 * Generates structured course content based on a user prompt
 */
export async function generateStructuredCourseContent(
  prompt: string
): Promise<CourseGenerationResponse> {
  try {
    const coursePrompt = createCoursePrompt(prompt)
    const client = getOpenAIClient()

    const response = await client.chat.completions.parse({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'user',
          content: coursePrompt,
        },
      ],
      response_format: zodResponseFormat(CourseContentSchema, 'course_content'),
    })

    if (response.choices[0]?.message?.content) {
      try {
        // Parse the JSON content from the response
        const jsonContent = JSON.parse(response.choices[0].message.content)

        // Validate with Zod schema
        const validatedContent = CourseContentSchema.parse(jsonContent)

        return {
          success: true,
          courseContent: validatedContent,
        }
      } catch (parseError) {
        console.error('Error parsing or validating response:', parseError)
        return {
          success: false,
          error: 'Failed to parse or validate the generated course content.',
        }
      }
    }

    return {
      success: false,
      error: 'No content was generated.',
    }
  } catch (error) {
    console.error('Error generating structured course content:', error)
    return {
      success: false,
      error: 'Sorry, there was an error generating structured course content.',
    }
  }
}
