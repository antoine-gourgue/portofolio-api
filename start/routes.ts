import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('contact', 'ContactController.send')
}).prefix('/api')
