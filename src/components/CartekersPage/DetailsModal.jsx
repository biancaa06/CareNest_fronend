function DetailsModal({ user, onClose, onMessage }) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            onClick={onClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="text-center">
                                <h3
                                    className="text-lg font-semibold leading-6 text-gray-900"
                                    id="modal-title"
                                >
                                    {user.baseUser.firstName} {user.baseUser.lastName}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {user.personalDescription}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 flex justify-center">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                                onClick={onMessage}
                            >
                                Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsModal;
