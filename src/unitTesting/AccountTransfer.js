import {AccountService} from '../controllers/accountTransfer'
import {UserService} from '../controllers/user'


const accountService = new AccountService();
const userService = new UserService();


describe('AccountService', () => {
    beforeEach(async () => {
      await accountService.connection.execute('DELETE FROM accounts');
    });
  
    it('should create a new account', async () => {
      const user = await userService.create('testuser', 'testpassword');
      const account = await accountService.create(user.id);
      expect(account.userId).toBe(user.id);
      expect(account.balance).toBe(0);
    });
  
    it('should deposit money into an account', async () => {
      const user = await userService.create('testuser', 'testpassword');
      const account = await accountService.create(user.id);
      const newAccount = await accountService.deposit(user.id, 100);
      expect(newAccount.balance).toBe(100);
    });
  
    it('should withdraw money from an account', async () => {
      const user = await userService.create('testuser', 'testpassword');
      const account = await accountService.create(user.id);
      await accountService.deposit(user.id, 100);
      const newAccount = await accountService.withdraw(user.id, 50);
      expect(newAccount.balance).toBe(50);
    });
  
    it('should throw an error when withdrawing more money than is in the account', async () => {
      const user = await userService.create('testuser', 'testpassword');
      const account = await accountService.create(user.id);
      await accountService.deposit(user.id, 100);
      expect(accountService.withdraw(user.id, 150)).rejects.toThrow('Insufficient funds');
    });
  
    it('should transfer money from one account to another', async () => {
      const user1 = await userService.create('testuser1', 'testpassword');
      const user2 = await userService.create('testuser2', 'testpassword');
      const account1 =  await accountService.create(user.id);
      const account2 = await accountService.create(user)
    })
});