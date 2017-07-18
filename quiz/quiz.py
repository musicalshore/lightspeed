#!/usr/bin/env python3
import json
import random
from collections import namedtuple
Attempt = namedtuple("Attempt", "key user_answer correct_answer")

def ask(question):
    print('\n')
    print(question['question'])
    for i in range(len(question['options'])):
        print('({0}) {1}'.format(i + 1, question['options'][i]), sep=' ')
    answer = input('Your answer> ')
    return answer

def quiz():
    with open('./quiz.json', 'r') as quiz_json:
        questions = json.load(quiz_json)['quiz']
    playing = True
    scores = []
    total_questions = len(questions)
    while playing == True:
        attempts = []
        correct = 0
        keys = list(questions.keys())

        random.shuffle(keys)
        for key in keys:
            user_answer = ask(questions[key])
            if user_answer == questions[key]['answer']:
                correct += 1
            attempts.append(Attempt(key, user_answer, questions[key]['answer']))
        if correct == total_questions:
            print ('Congrats! You got a perfect score!', end='\n\n')
        else:
            print ('\n\nYou scored {0} out of {1}'.format(correct, len(keys)))
            for attempt in attempts:
                if (attempt.user_answer != attempt.correct_answer):
                    print(questions[attempt.key]['question'])
                    print('You answered ({0}) {1}. The correct answer was ({2}) {3}.'.format(attempt.user_answer, questions[attempt.key]['options'][int(attempt.user_answer) - 1], attempt.correct_answer, questions[attempt.key]['options'][int(attempt.correct_answer) - 1]  ), end='\n\n')
        scores.append(correct)
        print ('You\'ve played {} rounds.'.format(len(scores)))
        for i in range(len(scores)):
            print ('Round {0}: {1} out of {2} correct answers.'.format(i + 1, scores[i], total_questions ))
        asking = True
        while asking == True:
            response = input('Would you like to go again, (Y)es or (N)o?> ')
            if response.lower() in {'y', 'yes'}:
                asking = False
            elif response.lower() in {'n', 'no'}:
                playing = False
                asking = False
                print ('Thanks for playing!', end='\n\n')

if __name__ == "__main__":
    quiz()
