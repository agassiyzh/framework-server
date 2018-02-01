async function testSync() {
    const hello = await "hello"
    return "OK"
}

testSync().then((result) => {
    console.log(result);
    
})
