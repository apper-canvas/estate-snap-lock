import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <ApperIcon name="Home" className="h-24 w-24 text-primary mx-auto mb-4" />
          <h1 className="text-6xl font-bold font-heading text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-surface-600 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-card hover:shadow-card-hover"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
            Back to Properties
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border border-primary rounded-xl hover:bg-surface-50 transition-colors font-medium shadow-card hover:shadow-card-hover"
          >
            <ApperIcon name="RotateCcw" className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound