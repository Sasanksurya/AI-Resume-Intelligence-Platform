from app.services.chat_service import ChatService

question = "What are the candidate's skills?"

answer = ChatService.ask(question)

print("\nAnswer:\n")
print(answer)