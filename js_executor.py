# -*- coding: utf-8 -*-
# @Time : 2020/11/27 12:15
# @File : js_executor.py
# @Author : Rocky C@www.30daydo.com
import execjs

def main():
    filename = '集思录.js'
    key = '397151C04723421F'
    user = ''
    password = ''
    with open(filename, 'r', encoding='utf8') as f:
        source = f.read()

    ctx = execjs.compile(source)
    encode_user = ctx.call('jslencode', user, key)
    encode_password = ctx.call('jslencode', password, key)
    print(encode_user)
    print(encode_password)


if __name__ == '__main__':
    main()
