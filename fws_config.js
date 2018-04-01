module.exports = {
    "author": "单炒饭",
    "mail": "liyong2@4399.com",
    "projectName": "pixi",
    "template": "default",
    "createTime": 1522553312033,
    "distReplace": {
        "*": [
            {
                "find": "feutil.localstatic.com",
                "replace": "pic.my4399.com/re/cms/feUtil"
            },
            {
                "find": "$$localhost/staticfile",
                "replace": "pic.my4399.com/re/cms/feUtil"
            }
        ]
    },
    "srcSync": {
        "targetPath": "",
        "fileType": "*"
    },
    "devSync": {
        "targetPath": "",
        "fileType": "*"
    },
    "distSync": {
        "targetPath": "",
        "fileType": "*"
    }
};