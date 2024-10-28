using AddressBook.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook.Core.Interfaces
{
    public interface IAddressRepository
    {
        Task<Address> AddAsync(Address address);
        Task<Address> GetByIdAsync(int id);
        Task<IEnumerable<Address>> GetAllAsync();
    }
}
