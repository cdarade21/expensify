const add =  (a,b) => a+b


const generateMeeting = (name='Anonymous') => `Hello ${name}!`
test('Add case', ()=> {
    const res = add(2,3)
    expect(res).toBe(5)
})

test('Name Case', ()=> {
    const message = generateMeeting('Ram')
    expect(message).toBe('Hello Ram!')
})

test('Name Case', ()=> {
    const message = generateMeeting()
    expect(message).toBe('Hello Anonymous!')
})