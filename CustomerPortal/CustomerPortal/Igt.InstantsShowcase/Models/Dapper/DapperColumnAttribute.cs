using Dapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models.Dapper
{
    /// <summary>
    /// https://stackoverflow.com/a/20969521
    /// </summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class DapperColumnAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        /// <param name="name"></param>
        public DapperColumnAttribute(string name)
        {
            Name = name;
        }
    }

    /// <summary>
    /// https://stackoverflow.com/a/20969521
    /// </summary>
    public class FallBackTypeMapper : SqlMapper.ITypeMap
    {
        private readonly IEnumerable<SqlMapper.ITypeMap> _mappers;

        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        /// <param name="mappers"></param>
        public FallBackTypeMapper(IEnumerable<SqlMapper.ITypeMap> mappers)
        {
            _mappers = mappers;
        }

        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        /// <param name="names"></param>
        /// <param name="types"></param>
        /// <returns></returns>
        public ConstructorInfo FindConstructor(string[] names, Type[] types)
        {
            foreach (var mapper in _mappers)
            {
                try
                {
                    var result = mapper.FindConstructor(names, types);

                    if (result != null)
                    {
                        return result;
                    }
                }
                catch (NotImplementedException)
                {
                    // the CustomPropertyTypeMap only supports a no-args
                    // constructor and throws a not implemented exception.
                    // to work around that, catch and ignore.
                }
            }
            return null;
        }

        /// <summary>
        /// https://www.csharpcodi.com/csharp-examples/Dapper.SqlMapper.ITypeMap.FindExplicitConstructor()/
        /// </summary>
        /// <returns></returns>
        public ConstructorInfo FindExplicitConstructor()
        {
            return _mappers
                .Select(mapper => mapper.FindExplicitConstructor())
                .FirstOrDefault(result => result != null);
        }

        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        /// <param name="constructor"></param>
        /// <param name="columnName"></param>
        /// <returns></returns>
        public SqlMapper.IMemberMap GetConstructorParameter(ConstructorInfo constructor, string columnName)
        {
            foreach (var mapper in _mappers)
            {
                try
                {
                    var result = mapper.GetConstructorParameter(constructor, columnName);

                    if (result != null)
                    {
                        return result;
                    }
                }
                catch (NotImplementedException)
                {
                    // the CustomPropertyTypeMap only supports a no-args
                    // constructor and throws a not implemented exception.
                    // to work around that, catch and ignore.
                }
            }
            return null;
        }

        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        /// <param name="columnName"></param>
        /// <returns></returns>
        public SqlMapper.IMemberMap GetMember(string columnName)
        {
            foreach (var mapper in _mappers)
            {
                try
                {
                    var result = mapper.GetMember(columnName);

                    if (result != null)
                    {
                        return result;
                    }
                }
                catch (NotImplementedException)
                {
                    // the CustomPropertyTypeMap only supports a no-args
                    // constructor and throws a not implemented exception.
                    // to work around that, catch and ignore.
                }
            }
            return null;
        }
    }

    /// <summary>
    /// https://stackoverflow.com/a/20969521
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ColumnAttributeTypeMapper<T> : FallBackTypeMapper
    {
        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        public ColumnAttributeTypeMapper()
            : base(new SqlMapper.ITypeMap[]
                    {
                        new CustomPropertyTypeMap(typeof(T),
                            (type, columnName) =>
                                type.GetProperties().FirstOrDefault(prop =>
                                    prop.GetCustomAttributes(false)
                                        .OfType<ColumnAttribute>()
                                        .Any(attribute => attribute.Name == columnName)
                            )
                        ),
                        new DefaultTypeMap(typeof(T))
                    })
        {
        }
    }

    /// <summary>
    /// https://stackoverflow.com/a/20969521
    /// </summary>
    public static class TypeMapper
    {
        /// <summary>
        /// https://stackoverflow.com/a/20969521
        /// </summary>
        /// <param name="namespace"></param>
        public static void Initialize(string @namespace)
        {
            var types = from assem in AppDomain.CurrentDomain.GetAssemblies().ToList()
                        from type in assem.GetTypes()
                        where type.IsClass && type.Namespace == @namespace
                        select type;

            types.ToList().ForEach(type =>
            {
                var mapper = (SqlMapper.ITypeMap)Activator
                    .CreateInstance(typeof(ColumnAttributeTypeMapper<>)
                                    .MakeGenericType(type));
                SqlMapper.SetTypeMap(type, mapper);
            });
        }
    }
}
