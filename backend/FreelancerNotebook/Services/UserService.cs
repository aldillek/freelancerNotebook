using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FreelancerNotebook.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _users = database.GetCollection<User>(settings.Value.UsersCollectionName);
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(user => user.id == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.id == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.id == userIn.id);

        public void Remove(string id) => 
            _users.DeleteOne(user => user.id == id);
    }
}