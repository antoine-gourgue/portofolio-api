import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('contact', 'ContactController.post')
}).prefix('/api')
