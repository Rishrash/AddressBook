using AddressBook.Core.Entities;
using AddressBook.Core.Interfaces;
using AddressBook.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Infrastructure.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly AddressBookDbContext _context;

        public AddressRepository(AddressBookDbContext context)
        {
            _context = context;
        }

        public async Task<Address> AddAsync(Address entity)
        {
            _context.Addresses.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Address> GetByIdAsync(int id)
        {
            return await _context.Addresses.FindAsync(id);
        }

        public async Task<IEnumerable<Address>> GetAllAsync()
        {
            return await _context.Addresses
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}
