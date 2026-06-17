# A Small C Language Program


<!--more-->
## Introduction

Well... I learned some C and made this thing 👑

It's basically basic syntax and simple judgment 👑

## Code

No nonsense, straight to the code 👑

```c
/*
Standard Weight Calculator
By WeepingDogel

WHO Calculation Method
Male: (height cm - 80) × 70% = standard weight
Female: (height cm - 70) × 60% = standard weight
Standard weight ±10% is normal
Standard weight ±10%~20% is overweight or underweight
Standard weight ±20% or more is obese or underweight
Overweight calculation formula
Overweight% = [(actual weight - ideal weight) / (ideal weight)] × 100%
*/
/* Import standard library stdio.h (required) */
#include <stdio.h>
/* Standard weight */
int weight;
/* Declare functions */
float judge(float parameter1,float parameter2);
float Count_M(float parameter);
float Count_F(float parameter);
/* Declare main function main() (without this, nothing works) */
int main()
{
    printf("Welcome.");
    /* Height */
    int height;
    /* Declare variable sex for gender */
    char sex;
    /* Declare variable: actual weight */
    int real_weight;
    /* Prompt user for gender */
    printf("Please enter your gender\n(M for Male, F for Female, note case sensitivity)");
    printf("\n\n:");
    /* Read user input and assign to sex */
    scanf("%c",&sex);
    /* Enter judgment, check if variable sex equals 'M' */
    if(sex == 'M')
    {
        /* When sex=M, it's male, execute the following code */
        printf("You are male");
        printf("Enter your height (in cm)");
        printf("\n\n:");
        scanf("%d",&height);
        weight = (int) Count_M((float) height);
        printf("The standard weight for your height is %dkg\n",weight);
        printf("Please enter your actual weight (in kg)");
        printf("\n:");
        scanf("%d",&real_weight);
        judge((float) real_weight,(float) weight);
    }
    /* Enter judgment, check if variable sex equals 'F' */
    else if(sex == 'F')
    {
        /* When sex=F, it's female, execute the following code */
        printf("You are female");
        printf("Enter your height (in cm)");
        printf("\n\n:");
        scanf("%d",&height);
        weight = (int) Count_F((float) height);
        printf("The standard weight for your height is %dkg\n",weight);
        printf("Please enter your actual weight (in kg)");
        printf("\n:");
        scanf("%d",&real_weight);
        judge((float) real_weight,(float) weight);
    }
    return 0;
}
/* Calculate male standard weight */
float Count_M(float parameter)
{
    /* Male: (height cm - 80) × 70% = standard weight */
    /* Define variable: result */
    float result;
    result = (int)(parameter - 80.0) * 0.7;

    return result;
}
/* Calculate female standard weight */
float Count_F(float parameter)
{
    /* Female: (height cm - 70) × 60% = standard weight */
    /* Define variable: result */
    float result;
    result = (int)(parameter - 70.0) * 0.6;

    return result;
}
/* Check if actual weight meets standard */
float judge(float parameter1,float parameter2)
{
    /* Standard weight ±10% is normal */
    if(parameter1 <= parameter2 + parameter2 * 0.1 && parameter1 >= parameter2 - parameter2 * 0.1)
    {
        printf("Your weight is within the normal standard");
    }
    /* Standard weight ±10%~20% is overweight or underweight */
    else if(parameter1 >= parameter2 + parameter2 * 0.1 && parameter1 <= parameter2 + parameter2 * 0.2)
    {
        printf("You are overweight");
    }
    /* Standard weight ±10%~20% is overweight or underweight */
    else if(parameter1 <= parameter2 - parameter2 * 0.1 && parameter1 >= parameter2 - parameter2 * 0.2)
    {
        printf("You are underweight");
    }
    /* Standard weight ±20% or more is obese or underweight */
    else if(parameter1 > parameter2 + parameter2 * 0.2)
    {
        printf("You are too fat.");
    }
    /* Standard weight ±20% or more is obese or underweight */
    else if(parameter1 < parameter2 - parameter2 * 0.2)
    {
        printf("You are too thin.");
    }
    return 0;
}
