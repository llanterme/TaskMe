using TaskMe.Infrastructure.Catalog;
using TaskMe.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskMe.Infrastructure.Uow
{
    public class Uow<T> : IDisposable where T : class
    {
        private Repository<T> _repository;
        private TaskMeEntities context = new TaskMeEntities();

        public Repository<T> Repository
        {
            get
            {
                if (this._repository == null)
                    this._repository = new Repository<T>(context);
                return _repository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
