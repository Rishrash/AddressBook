using AddressBook.Core.Entities;
using AddressBook.Core.Interfaces;

namespace AddressBook.Core.Services
{
    public class AddressService
    {
        private readonly IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<Address> CreateAddressAsync(Address address)
        {
            address.CreatedAt = DateTime.UtcNow;
            return await _addressRepository.AddAsync(address);
        }

        public async Task<Address> GetAddressAsync(int id)
        {
            return await _addressRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Address>> GetAllAddressesAsync()
        {
            return await _addressRepository.GetAllAsync();
        }
    }
}
