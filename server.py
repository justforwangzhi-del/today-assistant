#!/usr/bin/env python3
"""
今日助手 - 本地服务器
运行此脚本后，手机和电脑连接同一WiFi即可访问
"""
import http.server
import socketserver
import socket
import os

PORT = 8080
DIR = os.path.dirname(os.path.abspath(__file__))

def get_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

os.chdir(DIR)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

ip = get_ip()

print(f"""
╔══════════════════════════════════════════╗
║           今日助手 - 本地服务器           ║
╠══════════════════════════════════════════╣
║                                          ║
║  电脑访问: http://localhost:{PORT}         ║
║                                          ║
║  手机访问: http://{ip}:{PORT}      ║
║                                          ║
║  手机打开浏览器输入上方地址即可访问        ║
║  然后点击菜单"添加到主屏幕"安装          ║
║                                          ║
║  按 Ctrl+C 停止服务器                    ║
║                                          ║
╚══════════════════════════════════════════╝
""")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已停止")