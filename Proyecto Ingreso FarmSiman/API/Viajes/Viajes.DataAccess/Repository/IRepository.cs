using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viajes.DataAccess.Repository
{
    public interface IRepository <T, U>
    {
        public IEnumerable<U> List();

        public RequestStatus Insert(T item);

        public RequestStatus Update(T item);

        public U Find(string id);

        public RequestStatus Delete(T item);
    }
}
