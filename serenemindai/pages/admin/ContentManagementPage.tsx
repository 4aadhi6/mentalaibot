// import React, { useState, useEffect } from 'react';
// import Icon, { IconName } from '../../components/ui/Icon';

// const ContentManagementPage: React.FC = () => {
//     const [quotes, setQuotes] = useState<string[]>([]);
//     const [newQuote, setNewQuote] = useState('');

//     useEffect(() => {
//         const savedQuotes = JSON.parse(localStorage.getItem('motivationalQuotes') || '[]');
//         setQuotes(savedQuotes);
//     }, []);

//     const saveQuotes = (updatedQuotes: string[]) => {
//         localStorage.setItem('motivationalQuotes', JSON.stringify(updatedQuotes));
//         setQuotes(updatedQuotes);
//     };

//     const handleAddQuote = () => {
//         if (newQuote.trim() === '') return;
//         const updatedQuotes = [newQuote.trim(), ...quotes];
//         saveQuotes(updatedQuotes);
//         setNewQuote('');
//     };

//     const handleDeleteQuote = (quoteToDelete: string) => {
//         if (window.confirm("Are you sure you want to delete this quote?")) {
//             const updatedQuotes = quotes.filter(q => q !== quoteToDelete);
//             saveQuotes(updatedQuotes);
//         }
//     };

//     return (
//         <div className="animate-fade-in-up space-y-8">
//             <h1 className="text-3xl font-bold">Content Management</h1>

//             <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-8">
//                 <h2 className="text-2xl font-semibold mb-4 text-light-text dark:text-dark-text">Motivational Quotes</h2>
//                 <p className="text-light-subtle dark:text-dark-subtle mb-6">
//                     Add or remove the motivational quotes that are shown to users on their dashboard. If no quotes are added here, the AI will generate one automatically.
//                 </p>

//                 <div className="space-y-4">
//                     <div>
//                         <label htmlFor="quote" className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1">
//                             New Motivational Quote
//                         </label>
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <input
//                                 id="quote"
//                                 value={newQuote}
//                                 onChange={(e) => setNewQuote(e.target.value)}
//                                 onKeyPress={(e) => e.key === 'Enter' && handleAddQuote()}
//                                 placeholder="The secret of getting ahead is getting started."
//                                 className="flex-grow p-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                             />
//                              <button
//                                 type="button"
//                                 onClick={handleAddQuote}
//                                 disabled={!newQuote.trim()}
//                                 className="flex-shrink-0 bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus transition disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Add Quote
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-8">
//                 <h3 className="text-xl font-semibold mb-4">Current Quotes ({quotes.length})</h3>
//                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                     {quotes.length > 0 ? (
//                         quotes.map((quote, index) => (
//                            <div key={index} className="flex items-center justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
//                                <p className="italic text-light-text dark:text-dark-text">"{quote}"</p>
//                                <button
//                                     onClick={() => handleDeleteQuote(quote)}
//                                     className="p-2 flex-shrink-0 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors"
//                                     aria-label="Delete quote"
//                                 >
//                                    <Icon name={IconName.Trash} className="w-5 h-5"/>
//                                </button>
//                            </div>
//                         ))
//                     ) : (
//                         <div className="text-center py-8 px-4 text-light-subtle dark:text-dark-subtle">
//                              <Icon name={IconName.Content} className="mx-auto w-12 h-12 opacity-50 mb-4" />
//                              <p>No custom quotes found.</p>
//                              <p className="text-sm">Add a quote above to get started.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContentManagementPage;
import React, { useState, useEffect } from "react";
import Icon, { IconName } from "../../components/ui/Icon";
import { fetchApi } from "../../services/api";

interface Quote {
  _id: string;
  text: string;
}

const ContentManagementPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState("");

  const fetchQuotes = async () => {
    try {
      const fetchedQuotes = await fetchApi("/admin/quotes", "GET");
      setQuotes(fetchedQuotes);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAddQuote = async () => {
    if (newQuote.trim() === "") return;
    try {
      await fetchApi("/admin/quotes", "POST", { text: newQuote.trim() });
      setNewQuote("");
      fetchQuotes(); // Re-fetch to get the latest list
    } catch (error) {
      console.error("Failed to add quote:", error);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      try {
        await fetchApi(`/admin/quotes/${quoteId}`, "DELETE");
        fetchQuotes(); // Re-fetch to update the list
      } catch (error) {
        console.error("Failed to delete quote:", error);
      }
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <h1 className="text-3xl font-bold">Content Management</h1>

      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-light-text dark:text-dark-text">
          Motivational Quotes
        </h2>
        <p className="text-light-subtle dark:text-dark-subtle mb-6">
          Add or remove the motivational quotes that are shown to users on their
          dashboard.
        </p>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="quote"
              className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1"
            >
              New Motivational Quote
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="quote"
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddQuote()}
                placeholder="The secret of getting ahead is getting started."
                className="flex-grow p-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={handleAddQuote}
                disabled={!newQuote.trim()}
                className="flex-shrink-0 bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-4">
          Current Quotes ({quotes.length})
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <div
                key={quote._id}
                className="flex items-center justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <p className="italic text-light-text dark:text-dark-text">
                  "{quote.text}"
                </p>
                <button
                  onClick={() => handleDeleteQuote(quote._id)}
                  className="p-2 flex-shrink-0 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors"
                  aria-label="Delete quote"
                >
                  <Icon name={IconName.Trash} className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 px-4 text-light-subtle dark:text-dark-subtle">
              <Icon
                name={IconName.Content}
                className="mx-auto w-12 h-12 opacity-50 mb-4"
              />
              <p>No custom quotes found.</p>
              <p className="text-sm">Add a quote above to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
