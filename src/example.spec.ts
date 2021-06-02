class FriendList {
    friends = []
    addFriend(name: string) {
        this.friends.push(name)
        this.announceFriendship(name)
    }

    announceFriendship(name: string) {
        global.console.log(`${name} is now a friend`)
    }

    removeFriend(name: string) {
        const idx = this.friends.indexOf(name)
        if (idx === -1) {
            throw new Error('Friend not found!')
        }
        this.friends.splice(idx, 1)
    }
}

describe('FriendList', () => {
    let friendList
    beforeEach(() => {
        friendList = new FriendList()
    });
    it('initialize friend list', () => {
        expect(friendList.friends.length).toBe(0)
    })

    it('add a friend', () => {
        friendList.addFriend('hello')
        expect(friendList.friends.length).toBe(1)
    })
    test('call method announceFriendShip', () => {
        friendList.announceFriendship = jest.fn()
        expect(friendList.announceFriendship).not.toHaveBeenCalled()
        friendList.addFriend('hello')
        expect(friendList.announceFriendship).toHaveBeenCalledTimes(1)
        expect(friendList.announceFriendship).toHaveBeenCalledWith('hello')
    })
    describe('remove Friend', () => {
        test('remove a friend successfully', () => {
            friendList.addFriend('hello')
            expect(friendList.friends[0]).toEqual('hello')
            friendList.removeFriend('hello')
            expect(friendList.friends[0]).toBeUndefined()
        })
        test('remove a friend then throw exception as friend does not exist', () => {
            expect(() => friendList.removeFriend('hello')).toThrow()
            expect(() => friendList.removeFriend('hello')).toThrow(Error)
            expect(() => friendList.removeFriend('hello')).toThrow(Error('Friend not found!'))
            // failed test
            // expect(() => friendList.removeFriend('hello')).toThrow(Error('Failed Test'))
        })
    })
})

describe('my test', () => {
    it('return true', () => {
        expect(true).toBe(true)
    })
})