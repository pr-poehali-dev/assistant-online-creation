import json
import os
from anthropic import Anthropic

def handler(event: dict, context) -> dict:
    '''
    Business: AI assistant endpoint for code generation using Claude
    Args: event - dict with httpMethod, body (contains message)
          context - object with request_id, function_name
    Returns: HTTP response with AI-generated code/response
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    user_message: str = body_data.get('message', '')
    conversation_history: list = body_data.get('history', [])
    
    if not user_message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Message is required'}),
            'isBase64Encoded': False
        }
    
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API key not configured'}),
            'isBase64Encoded': False
        }
    
    client = Anthropic(api_key=api_key)
    
    messages = []
    for msg in conversation_history:
        messages.append({
            'role': msg['role'],
            'content': msg['content']
        })
    
    messages.append({
        'role': 'user',
        'content': user_message
    })
    
    response = client.messages.create(
        model='claude-3-5-sonnet-20241022',
        max_tokens=2048,
        system='Вы опытный AI-ассистент для разработки. Помогаете создавать web-приложения, Telegram-ботов и REST API. Отвечайте кратко и по делу, предоставляя готовый код когда требуется.',
        messages=messages
    )
    
    assistant_message = response.content[0].text
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'message': assistant_message,
            'model': response.model,
            'usage': {
                'input_tokens': response.usage.input_tokens,
                'output_tokens': response.usage.output_tokens
            }
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }
