
import {UserService} from '../controllers/usercontrollers'

const userService = new UserService();

describe('UserService', () => {
    beforeEach(async () => {
      await userService.connection.execute('DELETE FROM users');
    });
  
    it('should create a new user', async () => {
      const user = await userService.create('testuser', 'testpassword');
      expect(user.username).toBe('testuser');
      expect(user.password).not.toBe('testpassword');
    });
  
    it('should login a user', async () => {
      await userService.create('testuser', 'testpassword');
      const user = await userService.login('testuser', 'testpassword');
      expect(user.username).toBe('testuser');
    });
  
    it('should fail to login with incorrect password', async () => {
      await userService.create('testuser', 'testpassword');
      expect(userService.login('testuser', 'wrongpassword')).rejects.toThrow('Invalid username or password');
    });
  });