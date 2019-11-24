test("Hello World", () => {
    expect(1 + 2).toBe(3);
});

// test("This should fail", () => {
//     throw new Error("Failure!!");
// });

test("Async test demo", done => {
    setTimeout(() => {
        expect(1).toBe(1);
        done();
    }, 2000);
});

