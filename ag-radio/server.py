from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import json

class RadioHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/now-playing':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            # Здесь должна быть логика получения текущего трека
            response = {
                'track': 'test.mp3',
                'position': 0,
                'duration': 180
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            super().do_GET()

if __name__ == '__main__':
    os.chdir('music')  # Переходим в папку с музыкой
    server = HTTPServer(('0.0.0.0', 5000), RadioHandler)
    print("Сервер запущен на http://0.0.0.0:5000")
    server.serve_forever()
