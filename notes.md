---
id: notes
aliases: []
tags: []
---

# Projet

..

## Idée première page.

Page d'accueil, index.html,

Le nom de la page d'entrée, = LE JUGE.

Situation écrite.

Prompt avec qui redirige vers un LLM qui analyse la réponse et donne accès ou non.

CRITERE DE REPONSE :

Le format de la réponse doit être écrit ainsi "DECIDE LATER".

Ambitieux, passe a la suite.

19/03/2024

For the moment, trying to find a good way to setup our workflow, we want a page that the user can interrect with for the entry Page
of our project, the idea is that we are going to show to the user a "situation" and put a prompt bellow it.

What the user enter in that prompt is what the user want to do in this situation, since we can't handle infinite probability of string
to be analysed, we are going to use a LLM to analyse this for us, and we will ask a question to that llm, with the answer that the user send
to check if the user completed the test or not.

Obviously this is a idea, so today i try to check if everything is possible to work as we expect, so i'll give it a go, here is a walkthrough
step-by-step on how i proceed and think while doing so.

## We need to use a LLM to analyse the prompt of the user.

### How we setup that.

[OPENLLM](https://github.com/bentoml/OpenLLM)

OpenLLM has everything we need, it's running in a Apache License 2.0 wich mean that we need to credit them into our project.
wich is fine, it's a cool project.

They provide a ready on Docker that can run a llm ready for api, and that's exactly what we need.

### Instalation locally process :

`sudo apt install python3-pip`

`pip install openllm`

_has to edit later for deploy services_

### installation process for test purpose

I already had Docker installed, so i just runned the client.

`docker run --rm -it -p 3000:3000 ghcr.io/bentoml/openllm start facebook/opt-1.3b --backend pt`

for test purpose, we used the model "opt-1.3b" wich is the default model used in the "how to on their github page."

by the way, obviously hosting a llm is taking a lot of space, so the installation take a little time.

### setting up a basic webpage and the server with it.

Since we worked before using nodejs and javascript principaly we wanted to use it again, we love javascript.

so basic stuff...

`npm init -y`

- to generate the classic empty package.json

`npm install express`

to install the server, and then created a basic express server who will host on localhost the website to work on it.

`node server.js`

to run the server.

we now have a empty page to work on.

now i'll try to be able to make the communication between the empty form i made on the index page, and the llm that i host on port 3000
obviously the website is hosted on port 3001.

## Okay, i got both running on port 3000 and 3001.

Now i start trying to understand how the openllm api work, here is the link to the [documentation](https://docs.bentoml.com/en/latest/)

I need to do post commands from port 3000 to port 3001 using this path : /v1/generate

````curl -X 'POST' \
  'http://localhost:3000/v1/generate' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "prompt": "What is the meaning of life?",
  "stop": [],
  "llm_config": {
    "max_new_tokens": 128,
    "min_length": 0,
    "early_stopping": false,
    "num_beams": 1,
    "num_beam_groups": 1,
    "use_cache": true,
    "temperature": 0.75,
    "top_k": 15,
    "top_p": 0.78,
    "typical_p": 1,
    "epsilon_cutoff": 0,
    "eta_cutoff": 0,
    "diversity_penalty": 0,
    "repetition_penalty": 1,
    "encoder_repetition_penalty": 1,
    "length_penalty": 1,
    "no_repeat_ngram_size": 0,
    "renormalize_logits": false,
    "remove_invalid_values": false,
    "num_return_sequences": 1,
    "output_attentions": false,
    "output_hidden_states": false,
    "output_scores": false,
    "encoder_no_repeat_ngram_size": 0,
    "n": 1,
    "presence_penalty": 0,
    "frequency_penalty": 0,
    "use_beam_search": false,
    "ignore_eos": false,

    "skip_special_tokens": true
  },
  "adapter_name": null
}'```

above is the default curl that i used to test the purpose, and yay, it's working.
i got a response :

````

{
"prompt": "What is the meaning of life?",
"finished": true,
"outputs": [
{
"index": 0,
"text": "\nLife is the process by which organisms, such as bacteria and cells, reproduce themselves and continue to exist.",
"token_ids": [
50118,
12116,

        16,

        5,
        609,

        30,

        61,

        28340,
        6,
        215,
        25,
        9436,
        8,

        4590,
        6,
        33942,

        1235,
        8,
        535
      ],

```


Okay, so the LLM is working, and i know how to use CURL to ask her something.
Now i want that curl to be made from, the prompt on my website on port 3000.

## It's working !

I just setup a basic post from the index.html on a button near the prompt, and make the prompt send to the llm the content of the prompt.

i can see that i get a answer on the console of the llm :

`
2024-03-19T08:17:45+0000 [INFO] [api_server:llm-opt-service:19] 172.17.0.1:33282 (scheme=http,method=OPTIONS,path=/v1/generate,type=,length=) (status=404,type=text/plain; charset=utf-8,length=9) 0.540ms (trace=85f5ed8290d9c24412ac60aee4721dc9,span=b2b0ba39e1676b8b,sampled=1,service.name=llm-opt-service)
`

But yeah.. i got a issue on the console.

Blocage d’une requête multiorigines (Cross-Origin Request) : la politique « Same Origin » ne permet pas de consulter la ressource distante située sur http://localhost:3000/v1/generate. Raison : l’en-tête CORS « Access-Control-Allow-Origin » est manquant. Code d’état : 404

so i needed a way to enable cors on the llm.

nervermind, i can just add --cors in the docker run configurations. (i need to change the command for the docker run above. if this works)





$ eval "$(/home/soo/anaconda3/bin/conda shell.bash hook)"

alright.. i don't know their docker is okay-ish for test purpose, but it's definitly not enough, i try to install mistral now.

i'll runned :

`pip install "openllm[mistral]"`

to install the llm.



$ openllm start mistralai/Mistral-7B-Instruct-v0.2 --backend vllm --cors

to run it.

after few tests using mistral, the request took too long, and took 20gb of ram of my computer, this is not going to be a scenario case imaginable.

so i went back using docker, but this time i will use the options --gpus all to use my graphic card vram, and acceleration. this seems to work well.
i got response in 300ms instead of 57000ms using mistral with only cpu.

but i still have a problem, we need a good server to use a llm like that, and we don't really have much money to spend on a machine wich a good graphic card
and a lot of ram.

so today, i will check if i can use a llm that is kinda small and more portable.

for the utilisation we might need, it's more than enough probably.

*If this case scenario is not optimal at all, we will just go into a algorithm that will use matching words instead of using a LLM.*

aight so now the command used is


`$ docker run --gpus all --rm -it -p 3000:3000 ghcr.io/bentoml/openllm start facebook/opt-1.3b --backend vllm --cors`

adding `--gpus all` to use graphic card, and `cors` to enable multiorigines requests, even tho i'm working locally for the moment.

also i was using `backend pt`before, but apparently it will soon be deprecated, so i will use *vLLM* with --backend vllm now.

For the moment, with the LLM running on a docker using '--backend pt', it use 15.33GB of RAM using the opt-1.3b model from Facebook.
And with '--backend vllm' 14.64GB of ram, also a high peek on CPU usage when launching the LLM but i assume this is fine.

So i tryed to just use the 'generate' option to ask the LLM "what do you think about freedom ?"

i got the answer "I think freedom is good."

in 1233.564ms wich sound good.

bellow is the request on the llm console :

`
INFO 03-20 14:30:25 async_llm_engine.py:111] Finished request openllm-e04da1ebeb084649a596b63b7e7334cc.
2024-03-20T14:30:25+0000 [INFO] [api_server:llm-opt-service:16] 172.17.0.1:46268 (scheme=http,method=POST,path=/v1/generate,type=application/json,length=723) (status=200,type=application/json,length=1241) 1233.564ms (trace=f7c8e14085b8eb3019a905e694fe1223,span=207bc2ad7787ba2f,sampled=1,service.name=llm-opt-service)
`

## Api is working, now let's try to upgrade a little bit the website.


## Change the way we will proceed


Paragraph to explain why we change on the way we work.

## Setup the new application that we will use

Website -> Avec un prompt -> Prompt of the user -> wich is going to be analysed by Mistral API.
REQUEST 200 from the api of mistral the answer is going to be fetch on a small script that is going to filter the element in.
and return 0 or 1 if it's in the ouput of the answer.
the program return 0 or 1 and the node server will wait for the program to get a answer.
If 1 is returned to the nodeServer the user can go to the next page, if not he will have a error.

But first let's find a good "scenario"

after hours of research we finded that this prompt was working well enough for us :

`A user is asked about the limit of free speech : Please rate his answer based on the Implications question on a scale of 0 to 10 based on the criteria of reasoning quality, ethical considerations, respect for diversity, example relevance, and insight into implications. brief explanation in 7 words or less: 'USER_PROMPT'\"\nCriteria:\n1)Reasoning Quality: Does the response demonstrate clear and logical reasoning?\n2)Ethical Consideration: How does the response deal with ethical implications?\n3)Respect for Diversity: Does the response acknowledge and respect diverse viewpoints?\nExample Relevance: How relevant and illustrative are the examples provided?\nInsight into Implications: Does the response discuss the implications of where free speech stops?\nScore: [Insert x/10]\nSummary: [Insert a concise sentence (max. 7 words) capturing the essence of the evaluation]\n`

## Back to work on the website.

Since we changed the way we are working, and now use a API instead of a curl into llm.
We are going to use ***axios***
`npm install axios`
*axios is used to make http requests to an externel API*

Also.. we need to protect the api key, so i will use dotenv to load environment variables.
`npm install dotenv`

So i revisited the way the website worked, and added a small script, that is going to send a api call to the nodeServer.

The nodeServer is going to take the userprompt, and put the 'USER_PROMPT' at the correct place.

Then, the server wait the for API response, and then paste it into a json like that :
```

{"id":"d3e1029f67b845e9be9c4531ec8a982f","userOutput":"A artist should never be censured for the lyrics in he's music.","totalTokens":498,"messageContent":"Score: 5/10\nSummary: Artist's lyrics deserve protection, but ethical and diversity considerations matter."}

```
So i can keep track on how many tokens we are using on the api. we know that we use ~500 tokens per prompt.

We also get the *score* that the AI noted on the *userOutput* with a small text that resume why this note was attribued, that we will send to the front-end to make this a bit more interactive.

After that, the NodeServer is going to send to the front-end a answer.
```

1, Artist's lyrics deserve protection, but ethical and diversity considerations matter

```

The `1` or `0` that come first will indicate if the user can go to the next page or not.
And then, obviously the small sentence, for the user.

## Modification to the website to show the content of the small sentence.

We just returned the string from the "summary" object from the json to the answer of the call from the frontend.
And then used a javascript script to append a new div that we added on the website to show the content of it with a little of format.
Also added a minimum of 15 character to be able to send the prompt to the NodeServer to fix some issues with the IA that can give a good note
from a empty message, and also to reduce spam and token use. for the moment it's a pop-up we will send a message instead later on.


## 23-03 + 25-03


We added style and audio to the first page using Vue.js
We previously started the frontend using CSS/HTML/JavaScript but we figured that for the concept of our website where we will need multiple components and merge all the parts in a single page, React or Vue frameworks would help us a lot. We chose Vue because the framework is simpler and we thought it will me enough for what we want ultimately want to achieve.
So we had to transform our html+css+javascript into Vue.js components. This will benefit our collaboration as it will allow each of use to work individually on a separate component, so we guessed that our productivity would get a lot better using that framework.

The previous elements of our website is now in a folder called 'old frontend'
We added effects on the question and some rain effects with the audio that goes with it

We edited the validation of user input: Now if the AI gives a rate of 5 or below the answer is RED meaning he still doesn't have access to the next page of the website. If the answer is rated 6 or more the AI summary is in GREEN, allowing the user to play our game.
We deleted the "Validate" button, now the user just has to enter the 'Enter' keyboard to validate his answer.


## 23-03 + 25-03


We added style and audio to the first page using Vue.js
We previously started the frontend using CSS/HTML/JavaScript but we figured that for the concept of our website where we will need multiple components and merge all the parts in a single page, React or Vue frameworks would help us a lot. We chose Vue because the framework is simpler and we thought it will me enough for what we want ultimately want to achieve.
So we had to transform our html+css+javascript into Vue.js components. This will benefit our collaboration as it will allow each of use to work individually on a separate component, so we guessed that our productivity would get a lot better using that framework.

The previous elements of our website is now in a folder called 'old frontend'
We added effects on the question and some rain effects with the audio that goes with it

We edited the validation of user input: Now if the AI gives a rate of 5 or below the answer is RED meaning he still doesn't have access to the next page of the website. If the answer is rated 6 or more the AI summary is in GREEN, allowing the user to play our game.
We deleted the "Validate" button, now the user just has to enter the 'Enter' keyboard to validate his answer.



```
