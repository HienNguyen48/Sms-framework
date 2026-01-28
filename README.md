# Giới thiệu
- Project là 1 trang..... 
- Project có 3 môi trường:
    - Dev:
    - Alpha:

# Cấu trúc thư mục
- Gõ tree ở teminal 
- cấu trúc:
───node_modules // Thư mục chứ thư viện của playwright
│   ├───.bin
│   ├───@playwright
│   │   └───test
│   ├───@types
│   │   └───node
│   │       ├───assert
│   │       ├───compatibility
│   │       ├───dns
│   │       ├───fs
│   │       ├───inspector
│   │       ├───path
│   │       ├───readline
│   │       ├───stream
│   │       ├───test
│   │       ├───timers
│   │       ├───ts5.6
│   │       │   └───compatibility
│   │       ├───ts5.7
│   │       │   └───compatibility
│   │       ├───util
│   │       └───web-globals
│   ├───playwright
│   │   ├───lib
│   │   │   ├───agents
│   │   │   ├───common
│   │   │   ├───isomorphic
│   │   │   ├───loader
│   │   │   ├───matchers
│   │   │   ├───mcp
│   │   │   │   ├───browser
│   │   │   │   │   └───tools
│   │   │   │   ├───extension
│   │   │   │   ├───sdk
│   │   │   │   ├───terminal
│   │   │   │   └───test
│   │   │   ├───plugins
│   │   │   ├───reporters
│   │   │   │   └───versions
│   │   │   ├───runner
│   │   │   ├───third_party
│   │   │   ├───transform
│   │   │   └───worker
│   │   └───types
│   ├───playwright-core
│   │   ├───bin
│   │   ├───lib
│   │   │   ├───cli
│   │   │   ├───client
│   │   │   ├───generated
│   │   │   ├───mcpBundleImpl
│   │   │   ├───protocol
│   │   │   ├───remote
│   │   │   ├───server
│   │   │   │   ├───agent
│   │   │   │   ├───android
│   │   │   │   ├───bidi
│   │   │   │   │   └───third_party
│   │   │   │   ├───chromium
│   │   │   │   ├───codegen
│   │   │   │   ├───dispatchers
│   │   │   │   ├───electron
│   │   │   │   ├───firefox
│   │   │   │   ├───har
│   │   │   │   ├───recorder
│   │   │   │   ├───registry
│   │   │   │   ├───trace
│   │   │   │   │   ├───recorder
│   │   │   │   │   └───viewer
│   │   │   │   ├───utils
│   │   │   │   │   └───image_tools
│   │   │   │   └───webkit
│   │   │   ├───third_party
│   │   │   ├───utils
│   │   │   │   └───isomorphic
│   │   │   │       └───trace
│   │   │   │           └───versions
│   │   │   ├───utilsBundleImpl
│   │   │   └───vite
│   │   │       ├───htmlReport
│   │   │       ├───recorder
│   │   │       │   └───assets
│   │   │       └───traceViewer
│   │   │           └───assets
│   │   └───types
│   └───undici-types
├───src
│   ├───fixture
│   ├───pom
│   │   ├───api
│   │   └───page
│   │       └───cms2018
│   └───utils
└───tests
    ├───api-sms
    ├───authentication
    └───ui-sms

# Convention
## Quy tắc đặt tên
- Biến
- Function
 - File name

## PR
- Cần những nội dung gì?

## Coding convention
- Logic trong câu điều kiện luôn luôn cần có dấu  '{}'
    - Bad:
        ```js
        if(a>b)
             console.log("a>b");
        ```

    - Good:
        ```js
        if(a>b){
             console.log("a>b");
        }
        ```

## workflow
- Tạo branch mới 
- Tạo PR
- Gửi review 
