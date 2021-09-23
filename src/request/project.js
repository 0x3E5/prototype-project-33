import reqInstance from './config'
// 获取列表
export function getList(params) {
  return reqInstance({
    url: '/project/findAll',
    method: 'get',
    params
  })
}
// 保存
export function save(data) {
  return reqInstance({
    url: '/project/add',
    method: 'post',
    data
  })
}
// 更改
export function update(data) {
  return reqInstance({
    url: '/project/update',
    method: 'post',
    data
  })
}
// 根据id查询详情
export function getOne(id) {
  return reqInstance({
    url: `/project/findOneById/${id}`,
    method: 'get'
  })
}
// 删除
export function del(id) {
  return reqInstance({
    url: `/project/delete/${id}`,
    method: 'get'
  })
}